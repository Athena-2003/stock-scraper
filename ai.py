import subprocess
import platform
import sys

venv_name = "myenv"
log_file = open("output.log", "w")

subprocess.run(["python","-m","venv",venv_name], stdout=log_file, stderr=subprocess.STDOUT, check=True)

os = platform.system()

python_script = "./prediction.py"
activate_command = f'source {venv_name}/bin/activate'
ticker = sys.argv[1]
command = f'{activate_command} && python {python_script} {ticker}'

# if os == "Windows":
#     if subprocess.run([venv_name + "\\Scripts\\activate"], stdout=log_file, stderr=subprocess.STDOUT, shell=True).returncode != 0:
#         raise Exception("Failed to activate virtual environment on Windows")
#     subprocess.run([venv_name + "\\Scripts\\pip", "install", "xgboost"], stdout=log_file, stderr=subprocess.STDOUT,check=True)
#     subprocess.run([venv_name + "\\Scripts\\pip", "install", "scikit-learn"], stdout=log_file, stderr=subprocess.STDOUT, check=True)
#     subprocess.run([venv_name + "\\Scripts\\pip", "install", "yfinance"], stdout=log_file, stderr=subprocess.STDOUT, check=True)
# else:
activate_command = f"source {venv_name}/bin/activate"
# subprocess.run(activate_command, stdout=log_file, stderr=subprocess.STDOUT, shell=True)
subprocess.run([venv_name + "/bin/pip", "install", "xgboost"], stdout=log_file, stderr=subprocess.STDOUT, check=True)
subprocess.run([venv_name + "/bin/pip", "install", "scikit-learn"], stdout=log_file, stderr=subprocess.STDOUT, check=True)
subprocess.run([venv_name + "/bin/pip", "install", "yfinance"], stdout=log_file, stderr=subprocess.STDOUT, check=True)
subprocess.call(command, shell=True, executable='/bin/bash')

import warnings

warnings.filterwarnings("ignore",category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

