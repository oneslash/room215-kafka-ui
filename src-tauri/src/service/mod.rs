use rdkafka::config::FromClientConfig;
use rdkafka::consumer::{BaseConsumer, Consumer, StreamConsumer};
use rdkafka::Message;
use tracing::warn;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct KafkaClient {}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Topic {
    pub name: String,
    pub partitions: i32,
    pub replication: i32,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct KafkaEvent {
    pub key: String,
    pub value: String,
}

impl KafkaClient {
    pub fn new() -> Self {
        KafkaClient {}
    }

    fn create_client_config<T: FromClientConfig>(
        &self,
        brokers: &str,
        configs: &str,
        reader: bool,
    ) -> Result<T, String> {
        let mut config = rdkafka::ClientConfig::new();
        let configs = configs.trim().split("\n").collect::<Vec<&str>>();
        for c in configs {
            let kv: Vec<&str> = c.split("=").collect();
            if kv.len() != 2 {
                return Err(format!("Invalid config: {}", c));
            }
            config.set(kv[0], kv[1]);
        }
        config.set("bootstrap.servers", brokers);

        if reader {
            config.set("auto.offset.reset", "earliest");
        }
        Ok(config.create::<T>().unwrap())
    }

    pub fn ping(&self, bootstrap: &str, configs: &str) -> Result<bool, String> {
        let client: BaseConsumer = match self.create_client_config(bootstrap, configs, false) {
            Ok(c) => c,
            Err(e) => return Err(format!("Error: {}", e)),
        };
        let dur = std::time::Duration::from_millis(1000);
        let res = client.fetch_metadata(None, dur);
        match res {
            Ok(_) => Ok(true),
            Err(e) => Err(format!("Error: {}", e)),
        }
    }

    pub fn list_topics(&self, bootstrap: &str, configs: &str) -> Result<Vec<Topic>, String> {
        let client: BaseConsumer = self
            .create_client_config(bootstrap, configs, false)
            .unwrap();
        let dur = std::time::Duration::from_millis(1000);
        let res = client.fetch_metadata(None, dur);

        match res {
            Ok(metadata) => {
                let mut topics = Vec::new();
                for topic in metadata.topics() {
                    topics.push(Topic {
                        name: topic.name().to_string(),
                        partitions: topic.partitions().len() as i32,
                        replication: topic.partitions()[0].replicas().len() as i32,
                    });
                }
                Ok(topics)
            }
            Err(e) => Err(format!("Error: {}", e)),
        }
    }

    pub async fn get_events(
        &self,
        bootstrap: &str,
        configs: &str,
        topic: &str,
    ) -> Result<KafkaEvent, String> {
        let client_result = self.create_client_config::<StreamConsumer>(bootstrap, configs, false);
        let client: StreamConsumer = match client_result {
            Ok(c) => c,
            Err(e) => return Err(format!("Error creating client: {}", e)),
        };

        match client.subscribe(&[topic]) {
            Ok(_) => {}
            Err(e) => {
                return Err(format!("Error: {}", e));
            }
        };

        match client.recv().await {
            Ok(msg) => {
                let key = msg.key();
                let value = msg.payload();
                let event = KafkaEvent {
                    key: match key {
                        Some(k) => String::from_utf8_lossy(k).to_string(),
                        None => String::from(""),
                    },
                    value: String::from_utf8_lossy(value.unwrap_or(&[])).to_string(),
                };
                return Ok(event);
            }
            Err(_) => {
               return Err(format!("Error: {}", "error")); 
            }
        }
    }
}
