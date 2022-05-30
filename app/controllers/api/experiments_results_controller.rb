module Api
  class ExperimentsResultsController < ApplicationController

    def index
      experiments_results = ExperimentsResultsFileListingService.get_experiments_results
      render json: experiments_results
    end

    def show
      experiment = params[:experiment]
      experiment_zip_path = "lib/" + experiment + ".zip"
      command_line = "zip -r9 " + experiment_zip_path + " lib/experiments_results/" + experiment
      system(command_line)
      experiment_zip_name = experiment + ".zip"
      send_file_headers!(
        type: "application/zip",
        disposition: "attachment",
        filename: experiment_zip_name
      )
      response.headers["Last-Modified"] = Time.now.httpdate.to_s 
      send_file experiment_zip_path, :type => 'application/zip', :disposition => 'attachment'
    end
  end
end