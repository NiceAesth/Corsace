import { Beatmapset } from "./beatmap";
import { User } from "./user";

export interface Voter {
    voter: User;
    choices: Choice[];
}

export interface Choice {
    beatmapset: Beatmapset | undefined;
    user: User | undefined;
    order: number;
}