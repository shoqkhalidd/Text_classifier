const fast=require("./util.js")

test("properly predicting",() => {
    const res= fast("Which baking dish is best to bake a banana bread ?");
    expect(res).toBe("success!")

});