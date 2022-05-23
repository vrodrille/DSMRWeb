class AlgorithmParamsFileWriterService
  
  def self.write_params_file(algorithm_json, experiment_name)
    algorithm_params = JSON.parse(algorithm_json)
    algorithm_params_file = File.new("lib/executables/algorithm_config.txt", "w")
    dataset_file = File.new("lib/executables/dataset.arff", "w")
    dataset_file.close
    algorithm_params.each do | param, value |
      if (!param.eql? algorithm_params.keys.last)
        algorithm_params_file.puts(param + " = " + value)
        if (param.eql? "algorithm")
          algorithm_params_file.puts("inputData = lib/executables/dataset.arff")
          algorithm_params_file.puts("outputData = " + experiment_name + "_tra_qua.txt " + experiment_name + "_tst_qua.txt " + experiment_name + "_tst_quaSumm.txt " + experiment_name + "_rules.txt")
        end
      else
        algorithm_params_file.write(param + " = " + value)
      end
    end
    algorithm_params_file.close
  end
end