echo "Building files..."
npm run build
echo "Deploying to server..."
cd ./dist
sftp geoffreylitt_geoffreylitt@ssh.phx.nearlyfreespeech.net:example-docs <<< $'put -r .'
echo "Deploy complete!"
