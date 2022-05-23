import os
import sys
import matplotlib.pyplot as plt
import pandas as pd

batch_number = 1
processing_ended = False
experiment_directory = sys.argv[1]
last_batch_with_training_data = 0
batch_size = sys.argv[2]
drift_frequency = sys.argv[3]
drift_batches = []
batch_data = {}
fields = ["Timestamp","Rule","Class","NumRules","NumVars","Acc","AUC","CONF","Cov","FPR","G-Mean","GR","GR_Pct","Jacc","SuppDiff","Supp","TNR","TPR","WRAcc","WRAcc_Norm","ExecTime_ms"]
if os.path.exists(experiment_directory):
    with pd.ExcelWriter(experiment_directory + "/" + experiment_directory + ".xlsx") as writer:
        while (not processing_ended):
            batch_directory = '%05d' % batch_number
            if os.path.exists(experiment_directory + "/" + batch_directory):
                if os.path.exists(experiment_directory + "/" + batch_directory + "/" + experiment_directory + "_tst_quaSumm.txt"):
                    dataframe_text_file = pd.read_csv(experiment_directory + "/" + batch_directory + "/" + experiment_directory + "_tst_quaSumm.txt", delimiter="\\t", engine="python")
                    batch_data[batch_number] = dataframe_text_file.values.tolist()[0]
                    last_batch_with_training_data = batch_number
                else:
                    batch_data[batch_number] = batch_data[last_batch_with_training_data]
            elif(batch_number > 3):
                processing_ended = True
            batch_number += 1
        dataframe_unified = pd.DataFrame(data = batch_data)
        dataframe_unified = (dataframe_unified.T)

        drift_batches_calculation_finished = False
        last_batch = dataframe_unified.index[-1]
        instance_number = int(drift_frequency)
        while (not drift_batches_calculation_finished):
            drift_batch_number = (int(instance_number) // int(batch_size)) + 2
            if (drift_batch_number > last_batch):
                drift_batches_calculation_finished = True
            else:
                drift_batches.append(drift_batch_number)
            instance_number += int(drift_frequency)

        fig = plt.figure()
        ax = plt.subplot()
        ax.set_xlabel("Número de batch")
        ax.set_ylabel("Valor de la confianza")
        ax.set_ylim([0,1])
        dataframe_unified.plot(kind='line', y=7, title="Evolución de la confianza a lo largo de la ejecución", ax=ax, use_index=True, legend=False)
        for drift_index in drift_batches:
            plt.axvline(x=drift_index, color='gray', linestyle='dashed')
        plt.savefig(experiment_directory + "/Confianza.svg")
        plt.close()

        fig2 = plt.figure()
        ax2 = plt.subplot()
        ax2.set_xlabel("Número de batch")
        ax2.set_ylabel("Valor del TPR")
        ax2.set_ylim([0,1])
        dataframe_unified.plot(kind='line', y=17, title="Evolución del TPR a lo largo de la ejecución", ax=ax2, use_index=True, legend=False)
        for drift_index in drift_batches:
            plt.axvline(x=drift_index, color='gray', linestyle='dashed')
        plt.savefig(experiment_directory + "/TPR.svg")
        plt.close()

        dataframe_unified.loc['Medias'] = dataframe_unified.mean()
        dataframe_unified.to_excel(writer, header=fields)



