module Api
  class ExperimentsResultsController < ApplicationController

    require 'zip'

    skip_before_action :verify_authenticity_token

    def index
      experiments_results = ExperimentsResultsFileListingService.get_experiments_results
      render json: experiments_results
    end

    def show
      experiment = params[:experiment]
      experiment_zip_name = experiment + ".zip"
      compressed_filestream = Zip::OutputStream.write_buffer do |zos|
        Dir.chdir("lib/experiments_results/" + experiment)
        Dir.glob("**/*").reject {|fn| File.directory?(fn) }.each do |file|
          zos.put_next_entry(file)
          zos.print IO.read(file)
        end
      end
      Dir.chdir("../../..")
      compressed_filestream.rewind
      send_data compressed_filestream.read, filename: experiment_zip_name
    end
  end
end