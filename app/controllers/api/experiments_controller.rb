module Api
  class ExperimentsController < ApplicationController

    protect_from_forgery with: :null_session

    def index
      response_json = AlgorithmExecutingCheckerService.check_algorithm_running
      render json: response_json
    end

    def create
      algorithm_json = params[:algorithm]
      experiment_json = params[:experiment]
      time = Time.new
      experiment_name = format('%02d', time.day) + "-" + format('%02d', time.month) + "-" + (time.year).to_s + "-" + format('%02d', time.hour) + "-" + format('%02d', time.min) + "-" + format('%02d', time.sec)
      AlgorithmParamsFileWriterService.write_params_file(algorithm_json, experiment_name)
      ScriptRunningService.run_script(experiment_json)
      MqttPublisherAlgorithmRunningService.run_experiment(experiment_name, experiment_json)
      ExperimentFileCleanerService.clean_executables_directory(experiment_name, algorithm_json, experiment_json)
      head :no_content
    end
  end
end