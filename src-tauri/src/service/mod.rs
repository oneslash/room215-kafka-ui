use rdkafka::{consumer::{StreamConsumer, BaseConsumer, Consumer}, ClientConfig, config::FromClientConfig};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct KafkaClient {}

impl KafkaClient {
    pub fn new() -> Self {
        KafkaClient {}
    }

    pub fn create_client_config(&self, brokers: &str, configs: &str) -> Result<BaseConsumer, String> {
        let mut config = rdkafka::ClientConfig::new();
        let configs = configs.trim().split("\n").collect::<Vec<&str>>();
        for c in configs {
            let kv: Vec<&str> = c.split("=").collect();
            if kv.len() != 2 {
                return Err(format!("Invalid config: {}", c));
            }
            println!("{}={}", kv[0], kv[1]);
            config.set(kv[0], kv[1]);
        }
        config.set("bootstrap.servers", brokers);
        
        Ok(config.create::<BaseConsumer>().unwrap())
    }

    pub fn ping(&self, bootstrap: &str, configs: &str) -> bool {
        let client = self.create_client_config(bootstrap, configs).unwrap();
        let dur = std::time::Duration::from_millis(1000);
        let res = client.fetch_metadata(Some("topic_0"), dur);
        match res {
            Ok(_) => true,
            Err(e) => {
                println!("Error: {}", e);
                false
            }
        }
    }

    pub fn list_topics(&self, bootstrap: &str, configs: &str) -> Vec<String> {
        let client = self.create_client_config(bootstrap, configs).unwrap();
        let dur = std::time::Duration::from_millis(1000);
        let res = client.fetch_metadata(None, dur);
        match res {
            Ok(metadata) => {
                let mut topics = Vec::new();
                for topic in metadata.topics() {
                    topics.push(topic.name().to_string());
                }
                topics
            },
            Err(e) => {
                println!("Error: {}", e);
                Vec::new()
            }
        }
    }
}
