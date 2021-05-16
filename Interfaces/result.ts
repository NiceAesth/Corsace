import { Beatmapset } from "./beatmap";
import { User } from "./user";

export interface Result {
    beatmapset?: Beatmapset;
    user?: User;
    votes: number;
}