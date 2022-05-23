class ExperimentFileCleanerService

  def self.clean_executables_directory(experiment_name, algorithm_json, experiment_json)
    algorithm_params = JSON.parse(algorithm_json)
    experiment_params = JSON.parse(experiment_json)
    command_line = 'python3 lib/executables/ExcelGenerator.py lib/executables/' + experiment_name + ' ' + algorithm_params['period'] + ' ' + experiment_params['drift_location']
    system(command_line)
    command_line = 'mv lib/executables/' + experiment_name + ' lib/experiments_results/'
    system(command_line)
    system('rm lib/executables/dataset.arff')
    system('rm lib/executables/stream_config.arff')
    system('rm lib/executables/algorithm_config.txt')
  end
end