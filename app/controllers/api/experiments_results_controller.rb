module Api
  class ExperimentsResultsController < ApplicationController

    def index
      experiments_results = ExperimentsResultsFileListingService.get_experiments_results
      render json: experiments_results
    end
  end
end