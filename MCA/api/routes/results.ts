import Router from "@koa/router";
import { isLoggedInOsu } from "../../../Server/middleware";
import { isFinished, validatePhaseYear } from "../middleware";
import { Vote } from "../../../Models/MCA_AYIM/vote";
import { Category } from "../../../Models/MCA_AYIM/category";
import { Result } from "../../../Interfaces/result";

const resultsRouter = new Router();

resultsRouter.use(isLoggedInOsu);

resultsRouter.get("/:year?", validatePhaseYear, isFinished, async (ctx) => {
    const categoryId = ctx.query.category;

    const category = await Category.findOneOrFail(categoryId);
    const categoryType = category.type;
    const votes = await Vote.populate()
        .where("category.ID = :id", { id: category.ID })
        .getMany();

    // Create base result data
    let results = votes.map(vote => {
        const defaultResult: Result = {
            beatmapset: vote.beatmapset,
            user: vote.user,
            inRace: true,
            votes: 0,
        }
        return defaultResult;
    });
});

export default resultsRouter;
