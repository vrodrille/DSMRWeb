class GeneratorFileReaderService
  GeneratorParams = Struct.new(:command, :description, :default_value)

  def self.get_generators
    files = Dir.entries("lib/generators").select { |file| file != "." && file != ".." }
    files.map { |file| file.slice! ".txt" } 
    files.to_json
  end

  def self.get_generators_params(generators_name)
    file = File.open("lib/generators/" + generators_name + ".txt")
    file_data = file.read.split("\n")
    file_data = file_data.map do |content|      
      GeneratorParams.new(*content.split(";"))
    end
    file.close
    file_data.to_json
  end
end