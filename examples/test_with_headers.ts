import { OpineRequest, OpineResponse } from "../deps.ts";
import { assertSpyCall, Spy } from "../deps.ts";
import { mockRequest, mockResponse } from "../mod.ts";

function opineRequestHandler(req: OpineRequest, res: OpineResponse) {
    if(req.headers.get("apiKey") == "myKey") {
        res.send("valid");
    } else {
        res.send("invalid");
    }
}

Deno.test("Simple test with headers", () => {
  const request = mockRequest({
      headers: new Headers({
          'apiKey': 'myKey'
      })
  });
  const response = mockResponse();

  opineRequestHandler(request, response);

  assertSpyCall(response.send as Spy<any>, 0, { args: ["valid"] });
});
