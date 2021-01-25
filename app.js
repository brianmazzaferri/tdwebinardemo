// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const Datastore = require("nedb"), //(require in the database)
  // Security note: the database is saved to the file `datafile` on the local filesystem. It's deliberately placed in the `.data` directory
  // which doesn't get copied if someone remixes the project.
  db = new Datastore({ filename: ".data/datafile", autoload: true }); //initialize the database

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['chat:write'], //add scopes here
  installationStore: {
    storeInstallation: (installation) => {
      console.log("INSTALLATION:");
      console.log(installation);
      return db.insert(installation, (err, newDoc) => {
        if (err) console.log("There's a problem with the database ", err);
        else if (newDoc) console.log("installation insert completed");
      });
    },
    fetchInstallation: async (InstallQuery) => {
      console.log("FETCH:");
      console.log(InstallQuery);
      let incomingteam = InstallQuery.teamId;
      let result = await queryOne({"team.id":InstallQuery.teamId});
      console.log(result);
      return result;
    },
  },
});

//LISTENERS GO HERE

app.event('app_home_opened', async ({ event, client, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
	"type": "home",
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Select Channel To Manage",
				"emoji": true
			}
		},
		{
			"type": "input",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "#porobot-demo",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "*this is plain_text text*",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "*this is plain_text text*",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "*this is plain_text text*",
							"emoji": true
						},
						"value": "value-2"
					}
				],
				"action_id": "static_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": " ",
				"emoji": true
			}
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "PoroBot porobot-demo (#porobot-demo)",
				"emoji": true
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "#ask-porobot",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-0",
					"style": "primary"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Documentation",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-1",
					"style": "primary"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Settings*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":black_small_square: General Settings"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Configure",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "general-settings"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":black_small_square: Welcome Message"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Configure",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "welcome-message"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":black_small_square: Message Cooldown"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Configure",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "message-cooldown"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Work System*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":black_small_square: Ticket Creation"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Configure",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "ticket-creation"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Auto Respond*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":black_small_square: Engine Settings"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Configure",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "engine-settings"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Danger Zone*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":black_small_square: Remove Porobot"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Remove",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "remove-porobot"
			}
		}
	]
}
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.action('general-settings', async ({ body, ack, client }) => {

  try {
    // Acknowledge shortcut request
    await ack();

    // Call the views.open method using one of the built-in WebClients
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
	"type": "modal",
	"callback_id": "general-settings-modal",
	"title": {
		"type": "plain_text",
		"text": "PoroBot Settings",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Save",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-action",
				"initial_value": "PoroBot porobot-demo"
			},
			"label": {
				"type": "plain_text",
				"text": "Name",
				"emoji": true
			}
		},
		{
			"type": "input",
			"element": {
				"type": "multi_users_select",
				"initial_users": [
					"WTFQ276S3"
				],
				"placeholder": {
					"type": "plain_text",
					"text": "Select users",
					"emoji": true
				},
				"action_id": "multi_users_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Channel Administrators",
				"emoji": true
			}
		},
		{
			"type": "input",
			"optional": true,
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Trigger via :porobot: reaction on message",
							"emoji": true
						},
						"value": "value-0"
					}
				],
				"action_id": "checkboxes-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Trigger Settings",
				"emoji": true
			}
		},
		{
			"type": "input",
			"optional": true,
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Enable Debug Mode",
							"emoji": true
						},
						"value": "value-0"
					}
				],
				"action_id": "checkboxes-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Debug Settings",
				"emoji": true
			}
		}
	]
}
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.view('general-settings-modal', ({ ack, body, view, context }) => {
  // Acknowledge the view_submission event
  ack();
});

//BOILERPLATE BELOW HERE

//look up any one document from a query string
function queryOne(query) {
  return new Promise((resolve, reject) => {
    db.findOne(query, (err, docs) => {
      if (err) console.log("There's a problem with the database: ", err);
      else if (docs) console.log(query + " queryOne run successfully.");
      resolve(docs);
    });
  });
}

//print the whole database (for testing)
function printDatabase() {
  db.find({}, (err, data) => {
    if (err) console.log("There's a problem with the database: ", err);
    else if (data) console.log(data);
  });
}

//clear out the database
function clearDatabase(team,channel) {
  db.remove({team:team, channel:channel}, { multi: true }, function(err) {
    if (err) console.log("There's a problem with the database: ", err);
    else console.log("database cleared");
  });
}
(async () => {
  // boilerplate to start the app
  await app.start(process.env.PORT || 3000);
  //printDatabase();
  console.log("⚡️ Bolt app is running!");
})();
