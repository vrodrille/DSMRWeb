class ScriptRunningService 

  def self.run_script(experiment_json)
    experiment_params = JSON.parse(experiment_json)
    command_line = 'java -jar \'lib/executables/MOAKafkaProducer.jar\' -g \'' + experiment_params["generator_1"] + '\',\'' + experiment_params["generator_2"] + '\' -n ' + experiment_params["total_instances"].to_s + ' -p ' + experiment_params["drift_location"] + ' -w ' + experiment_params["drift_window_instances"] + ' --topic experiments -r ' + experiment_params["information_frequency"].to_s + ' -t ' + experiment_params["time_interval"].to_s + ' --header config.arff'
    t = Thread.new { 
      system(command_line)
      system('mv config.arff lib/executables')
    } 
    t.join
  end
end