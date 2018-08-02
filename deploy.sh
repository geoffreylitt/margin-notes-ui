echo "Building files..."
npm run build
echo "Deploying to server..."
cd ./dist
sftp geoffreylitt_geoffreylitt@ssh.phx.nearlyfreespeech.net:margin-notes <<< $'put -r .'
echo "Deploy complete!"
