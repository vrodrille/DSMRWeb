class ExperimentParamsFileWriter

  def self.write_experiment_params_file(experiment_name, algorithm_json, experiment_json)
    algorithm_params = JSON.parse(algorithm_json)
    experiment_params = JSON.parse(experiment_json)
    file_location = "lib/experiments_results/" + experiment_name + "/params.txt"
    experiment_file = File.new(file_location, "w")
    experiment_file.puts("Parámetros del algoritmo:")
    algorithm_params.each do | param, value |
      experiment_file.puts(param + " = " + value)
    end
    experiment_file.puts("Parámetros del generador:")
    experiment_params.each do | param, value |
      if (!param.eql? experiment_params.keys.last)
        experiment_file.puts(param + " = " + value.to_s)
      else
        experiment_file.write(param + " = " + value.to_s)
      end
    end
    experiment_file.close
  end
end