skip="index"
declare -a files
fileName="files.json"

for entry in ./*.html
do
  tmp=${entry#*/}
  tmp=${tmp%.*}
  if [ "$tmp" == "$skip" ]
  then
    echo $tmp
  else
    files+=($tmp)
  fi
done

pos=$(( ${#files[*]} - 1 ))
last=${files[$pos]}

echo "[" > files.json
for FILE in "${files[@]}"
do
  if [[ $FILE == $last ]]
  then
    echo "\"$FILE\"" >> $fileName
  else
    echo "\"$FILE\"," >> $fileName
  fi
done
echo "]" >> files.json

python -m SimpleHTTPServer 3000
