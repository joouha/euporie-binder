export PATH=$HOME/.local/bin/:$PATH


PS1="\e[32m$\e[0m "

pip install -qqq --upgrade euporie
clear

echo "Welcome to euporie!"
echo
echo "To run euporie-notebook, type \"euporie-notebook\" followed by <Enter>"
echo
echo -e "\e[32m$\e[0m euporie --help"

euporie --help
