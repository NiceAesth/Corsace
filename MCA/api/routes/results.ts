import Router from "@koa/router";
import { isLoggedInOsu } from "../../../Server/middleware";
import { isFinished, validatePhaseYear } from "../middleware";
import { Vote } from "../../../Models/MCA_AYIM/vote";
import { Category } from "../../../Models/MCA_AYIM/category";
import { Result } from "../../../Interfaces/result";
import { Voter } from "../../../Interfaces/voter";
import { CategoryType } from "../../../Interfaces/category";

const resultsRouter = new Router();

resultsRouter.use(isLoggedInOsu);

resultsRouter.get("/:year?", validatePhaseYear, isFinished, async (ctx) => {
    const categoryId = ctx.query.category;

    const category = await Category.findOneOrFail(categoryId);
    const categoryType = category.type === CategoryType.Beatmapsets ? "beatmapset" : "user";
    const votes = await Vote.populate()
        .where("category.ID = :id", { id: category.ID })
        .getMany();

    // Create base voter data to use
    let [results, voters]: [Result[], Voter[]] = [[], []];
    for (const vote of votes) {
        if (results.some(result => result[categoryType]?.ID !== vote[categoryType]?.ID)) {
            let result: Result = {votes: 0};
            if (categoryType === "beatmapset")
                result.beatmapset = vote.beatmapset;
            else
                result.user = vote.user;
        }

        if (voters.some(voter => voter.voter.ID === vote.voter.ID)) {
            const i = voters.findIndex(voter => voter.voter.ID === vote.voter.ID);
            voters[i].choices.push({
                user: vote.user,
                beatmapset: vote.beatmapset,
                order: vote.choice,
            });
        } else {
            voters.push({
                voter: vote.voter,
                choices: [{
                    user: vote.user,
                    beatmapset: vote.beatmapset,
                    order: vote.choice,
                }],
            })
        }
    }
    // Order choices so that 1 is first
    voters = voters.map(voter => {
        voter.choices.sort((a, b) => a.order - b.order);
        return voter;
    });

    // Round 1
    for (const voter of voters) {

    }

    while (true) {

    }
});

export default resultsRouter;
