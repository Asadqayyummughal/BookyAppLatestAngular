export class BookyConfig{
    private static path='http://localhost:3000/api';
    public static getPath():string{
        return BookyConfig.path;
    }

}