class MqttClientPublisherService
  CONNECTION_IP_ADDRESS = "127.0.0.1"
  CONNECTION_PORT = 1883

  def self.publish_experiment(experiment)
    client = MQTT::Client.connect(CONNECTION_IP_ADDRESS,CONNECTION_PORT)
    client.publish("experiments", experiment)
    client.disconnect()
  end
end