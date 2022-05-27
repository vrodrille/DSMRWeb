class ExperimentsResultsFileListingService
  def self.get_experiments_results
    files = Dir.entries("lib/experiments_results").select { |file| file != "." && file != ".." }
    files.to_json
  end
end