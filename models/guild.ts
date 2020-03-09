import { model, Schema, Document } from 'mongoose';
import Module from '../modules/module';

export class AutoModModule extends Module {
    ignoreRoles: string[] = [];
    autoDeleteMessages = true;
    filters: MessageFilter[] = [];
    banWords: string[] = [];
    banLinks: string[] = [];
}

export enum MessageFilter { Words, Links }

export class GeneralModule extends Module {
    prefix = '/';
    isPrivate = false;
    ignoredChannels: string[] = [];
}

export class XPModule extends Module {
    levelRoles: LevelRole[] = [];
    ignoredRoles: string[] = [];
    xpPerMessage = 50;
    xpCooldown = 5;
}

export interface LevelRole {
    level: number;
    role: string;
}

const guildSchema = new Schema({
    _id: String,
    autoMod: { type: Object, default: new AutoModModule() }, 
    general: { type: Object, default: new GeneralModule() },
    music: Object,
    xp: { type: Object, default: new XPModule() }
});

export interface GuildDocument extends Document {
    _id: string;
    autoMod: AutoModModule;
    general: GeneralModule;
    music: object;
    xp: XPModule;
}

export const SavedGuild = model<GuildDocument>('guild', guildSchema);