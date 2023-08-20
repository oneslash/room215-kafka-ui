use rdkafka::consumer::{BaseConsumer, Consumer};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct KafkaClient {}

impl KafkaClient {
    pub fn new() -> Self {
        KafkaClient {}
    }

    fn create_client_config(&self, brokers: &str, configs: &str) -> Result<BaseConsumer, String> {
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

    pub fn ping(&self, bootstrap: &str, configs: &str) -> Result<bool, String>{
        let client = match self.create_client_config(bootstrap, configs) {
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

    pub fn list_topics(&self, bootstrap: &str, configs: &str) -> Result<Vec<String>, String> {
        let client = self.create_client_config(bootstrap, configs).unwrap();
        let dur = std::time::Duration::from_millis(1000);
        let res = client.fetch_metadata(None, dur);
        match res {
            Ok(metadata) => {
                let mut topics = Vec::new();
                for topic in metadata.topics() {
                    topics.push(topic.name().to_string());
                }
                Ok(topics)
            }
            Err(e) => {
                Err(format!("Error: {}", e))
            }
        }
    }
}
