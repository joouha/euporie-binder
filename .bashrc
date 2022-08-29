
PS1="$ "

if [[ $- == *i* ]]
then
    euporie-notebook ~/introduction.ipynb
fi

# clear
echo "Welcome to euporie!"
echo
echo "To open an example notebook with euporie, type \"euporie-notebook introduction.ipynb\" followed by <Enter>"
echo
