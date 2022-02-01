class AlgorithmFileReaderService
  AlgorithmParams = Struct.new(:label, :name, :default_value)

  def self.get_algorithms
    files = Dir.entries("lib/algorithms").select { |file| file != "." && file != ".." }
    files.map { |file| file.slice! ".txt" } 
    files.to_json
  end

  def self.get_algorithm_params(algorithm_name)
    file = File.open("lib/algorithms/" + algorithm_name + ".txt")
    file_data = file.read.split("\n")
    file_data = file_data.map do |content|      
      AlgorithmParams.new(*content.split(";"))
    end
    file.close
    file_data.to_json
  end
end