class AlgorithmExecutingCheckerService

  def self.check_algorithm_running
    if (File.file?("lib/executables/algorithm_config.txt"))
      response = {"algorithm_executing" => true}
    else
      response = {"algorithm_executing" => false}
    end
    return response.to_json
  end
end