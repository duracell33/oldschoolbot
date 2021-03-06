import { Command, KlasaMessage, CommandStore } from 'klasa';

import { GuildSettings } from '../../lib/GuildSettings';

export default class extends Command {
	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			subcommands: true,
			runIn: ['text'],
			usage: '<on|off>',
			permissionLevel: 7,
			requiredPermissions: ['EMBED_LINKS']
		});
	}

	async on(msg: KlasaMessage) {
		if (msg.guild!.settings.get(GuildSettings.HCIMDeaths) === msg.channel.id) {
			return msg.sendLocale('HCIM_TWEETS_ALREADY_ENABLED');
		}
		if (msg.guild!.settings.get(GuildSettings.HCIMDeaths)) {
			await msg.guild!.settings.update(GuildSettings.HCIMDeaths, msg.channel);
			return msg.sendLocale('HCIM_TWEETS_ENABLED_OTHER');
		}
		await msg.guild!.settings.update(GuildSettings.HCIMDeaths, msg.channel);
		return msg.sendLocale('HCIM_TWEETS_ENABLED');
	}

	async off(msg: KlasaMessage) {
		if (!msg.guild!.settings.get(GuildSettings.HCIMDeaths)) {
			return msg.sendLocale('HCIM_TWEETS_ARENT_ENABLED');
		}
		await msg.guild!.settings.reset(GuildSettings.HCIMDeaths);
		return msg.sendLocale('HCIM_TWEETS_DISABLED');
	}
}
