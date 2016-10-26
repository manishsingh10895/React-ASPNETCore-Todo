
export class TodoItem
{
    name: string;
    detail: string;
    isCompleted: boolean;

    constructor(name:string, detail:string) {
        this.name = name;
        this.detail = detail;
        this.isCompleted = false;
    }
}