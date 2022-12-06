import { Repo } from "./repo"

test('should first', () => {
    const repo = new Repo()
    const r = repo.load()
    console.log(r)
    expect(r).toBeInstanceOf(Promise)
})

