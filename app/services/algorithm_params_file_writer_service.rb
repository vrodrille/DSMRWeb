class AlgorithmParamsFileWriterService
  
  def self.write_params_file(algorithm_json)
    algorithm_params = JSON.parse(algorithm_json)
    algorithm_params_file = File.new("lib/executables/algorithm_config.txt", "w")
    algorithm_params.each do | param, value |
      if (!param.eql? "algorithm")
        if (!param.eql? algorithm_params.keys.last)
          algorithm_params_file.puts(param + "=" + value)
        else
          algorithm_params_file.write(param + "=" + value)
        end
      end
    end
    algorithm_params_file.close
  end
end