const fast=require("./util.js")

test("Checking it can predict a statement",() => {
    const res= fast("Which baking dish is best to bake a banana bread?");
    expect(res).toBe("success!")

});


test("Checking it fails when predicting an empty statement",() => {
    const res= fast("");
    expect(res).toBe("fail")

});