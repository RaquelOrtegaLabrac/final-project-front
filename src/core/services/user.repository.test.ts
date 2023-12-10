import { User } from "../../features/models/user";
import { UserRepository } from "./user.repository";

describe("Given UserRepository", () => {
  let repo: UserRepository;
  // eslint-disable-next-line prefer-const
  repo = new UserRepository("/");

  describe("When register is called", () => {
    test("Then it should return the registered user", async () => {
      const url = "/";
      const mockUser = {} as unknown as User;
      const mockResponse = {} as unknown as User;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await repo.register(mockUser);

      expect(global.fetch).toHaveBeenCalledWith(url + "user/register", {
        method: "POST",
        body: JSON.stringify(mockUser),
        headers: { "Content-Type": "application/json" },
      });
      expect(result).toEqual(mockResponse);
    });
  });
  describe("When login is called", () => {
    test("then it should successfully login the user if it matches", async () => {
      const url = "/user/login";
      const userId = "2";
      const user = { id: userId };
      const mockResponse = { id: userId };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await repo.login(user);

      expect(global.fetch).toHaveBeenCalledWith(url, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
