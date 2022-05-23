class MqttPublisherAlgorithmRunningService
  CONNECTION_IP_ADDRESS = "127.0.0.1"
  CONNECTION_PORT = 1883

  def self.run_experiment(experiment_name, experiment_json)
    command_line = 'java -jar \'lib/executables/FEPCM-1.0-SNAPSHOT-jar-with-dependencies.jar\' \'lib/executables/algorithm_config.txt\' \'lib/executables/stream_config.arff\''
    t = Thread.new {
      system(command_line)
    }
    sleep 1
    client = MQTT::Client.connect(CONNECTION_IP_ADDRESS,CONNECTION_PORT)
    client.publish("experiments", experiment_json)
    client.disconnect()
    t.join
    system('rm FuzzySemantics.txt')
    command_line = 'mv ' + experiment_name + ' lib/executables'
    system(command_line)
  end
end