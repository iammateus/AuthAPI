echo 'Initializing application'
yarn install

if [ ! -f ".env" ]; then
    echo 'Copying .env.dev to .env'
    cp .env.dev .env
fi