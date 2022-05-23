class ExperimentFileCleanerService

  def self.clean_executables_directory(experiment_name)
    ## Esto lo mismo se puede hacer en el fichero de ejecución del algoritmo pues no habrá que hacer enrutado para borrar los archivos generados. O lo mismo sí, el algoritmo de Java genera en la carpeta executables los ficheros
    ## Lo que sí hay que hacer aquí es la ejecución del fichero de python estando la carpeta de resultados en el directorio executables
    command_line = 'python3 lib/executables/ExcelGenerator.py lib/executables/' + experiment_name
    system(command_line)
    command_line = 'mv lib/executables/' + experiment_name + " /lib/experiments_results"
    system(command_line)

    system('rm lib/executables/dataset.arff')
    system('rm lib/executables/stream_config.arff')
    system('rm lib/executables/algorithm_config.txt')
  end
end