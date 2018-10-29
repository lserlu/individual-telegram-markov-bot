### Node Telegram bot that creates Markov chains based on a given user.
# Configuration
First, open the console on the project folder and execute ```npm i``` to install the node modules.
Then, open the ```config.js``` file. Put your bot token and the user ID you want the bot to work on here. ```MAX_CHAR``` is the maximum number of characters that the bot may form a chain with, 300 by default. ```MESSAGES_TO_UPDATE``` is the amount of messages it takes to update the ```quotes.txt``` file, 10 by default.

# Start the bot
After doing the configuration, just go into the bot directory and execute ```node index.js```. The bot will start to log only your messages, but remember that if you're using it on a group it needs permission to read messages. After reading the ```MESSAGES_TO_UPDATE``` amount it will update ```quotes.txt``` and it'll be ready to use.

# Commands
You can use ```/chain``` to make a chain (if the quotes.txt file has any contents), ```/settings``` to check the number of times your bot has formed a chain and ```/ping``` to check if the bot works. There isn't much more to it, really.

### If you have any suggestion, let me know, and I'll work on it.
