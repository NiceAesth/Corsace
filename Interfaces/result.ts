import { Beatmapset } from "./beatmap";
import { User } from "./user";

export interface Result {
    user?: User;
    beatmapset?: Beatmapset;
    inRace: boolean;
    votes: number;
}
