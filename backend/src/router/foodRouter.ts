import {Router} from 'express'
import asyncHandler from 'express-async-handler'
import { sam_food, sam_tags } from '../data';
import { FoodModel } from '../models/food.model';

const router=Router();

router.get('/seed', asyncHandler(async (req, res) => 
{
    const FoodCount=await FoodModel.countDocuments();
    if(FoodCount>0)
    {
        res.send("Seed is already done");
        return;

    }
    await FoodModel.create(sam_food)
    res.send("Seed is done")
}))
router.get('/', async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
})

router.get('/search/:serachterm',  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.serachterm, 'i');
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  }))
router.get('/tags',  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  }))
// getAllFoodByTag(tag:string):Food[]
// {
//   return tag==="All"?
//   this.getAll():
//   this.getAll().filter(food=>food.tags?.includes(tag));
// }
// getFoodByid(id:string):Food{
//   return this.getAll().find(food=> food.id==id)??new Food();
// }
router.get('/tags/:tag',  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tag});
    res.send(foods);
  })
)
router.get('/:id',asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.id);
    res.send(food);
  }))
export default router;