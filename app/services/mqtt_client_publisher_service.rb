class MqttClientPublisherService
  CONNECTION_IP_ADDRESS = "127.0.0.1"

  def self.publish_experiment(experiment)
    client = MQTT::Client.connect(CONNECTION_IP_ADDRESS,1883)
    client.publish("experiments", experiment)
    client.disconnect()
  end
end