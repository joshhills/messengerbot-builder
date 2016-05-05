# messengerbot-builder

An interface to build your own NodeJS webhook compatible with the Facebook Messenger API.

## How it works:

Building upon the messenger API, this generator provides an easy interface to build message elements in response to user triggers. There are several different types of triggers, that can respond to the exact string the user has sent, specific profile names, or postbacks from previous rich content bubbles.

Each section you add allows for pre-code; essentially allowing you to inject your own custom JavaScript before generating the file to save you time poking through it. The idea is you can use the generator and then the output file should just work when hosted.

In any non-code boxes, you may reference literal code by wrapping your text with parentheses `{}`. Some variables are already set up in scope within each trigger - `{text}`, `{first_name}`, `{last_name}`, `{precode}`.

### Attributions/Useful Links

*[Messenger Documentation](https://developers.facebook.com/docs/messenger-platform/send-api-reference#welcome_message_configuration)
*[messenger-bot](https://github.com/JoshHills/messengerbot-builder/blob/master/README.md)
