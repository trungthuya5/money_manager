import { Request, Response } from 'express';
import { Controller, Get, Middleware, Post } from '../utils/decorators';
import { sayGoodbye } from './test';

@Controller('/cats')
export default class CatController {

  private cats: Array<{ name: string }> = [
    { name: 'Tom' },
    { name: 'Kitty' },
  ];

  @Get('')
  public index(req: Request, res: Response): void {
    res.json({ cats: this.cats });
  }

  @Post('')
  public add(req: Request, res: Response): void {
    this.cats.push(req.body);
    res.status(204).json();
  }

  @Get('/:name')
  @Middleware(sayGoodbye)
  public findByName(req: Request, res: Response): unknown {
    const { name } = req.params;
    const foundCat = this.cats.find((c) => c.name === name);
    if (foundCat) {
      return res.json({ cat: foundCat });
    }
    return res.status(404).json({ message: 'Cat not found!' });
  }
}