class AlgorithmParamsFileWriterService
  
  def self.write_params_file(algorithm_json)
    algorithm_params = JSON.parse(algorithm_json)
    algorithm_params_file = File.new("lib/executables/config.txt", "w")
    algorithm_params.each do | param, value |
      if (!param.eql? "algorithm")
        algorithm_params_file.puts(param + "=" + value)
      end
    end
    algorithm_params_file.close
  end
end