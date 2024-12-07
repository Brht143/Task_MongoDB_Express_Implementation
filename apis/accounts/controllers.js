const accounts = require("../../accounts");

const accountQuery = require("../../models/Account");

exports.viewAccounts = async (req, res) => {
  try {
    const allAccounts = await accountQuery.find();
    res.status(200).json(allAccounts);
  } catch (e) {
    res.status(404).json({ msg: "error" });
    console.log(e.Message);
  }
};

exports.convertFundsToUSD = (req, res) => {
  const username = req.params.username;
  const currency = req.query.currency;
  return currency
    ? res.status(200).json({
        messge:
          accounts.find((account) => account.username == username).funds * 3.25,
      })
    : res
        .status(404)
        .json({ messge: `${currency} / ${username} are not available` });
};

exports.createAccount = async (req, res) => {
  const username = req.body.username;
  const funds = req.body.funds;
  try {
    const id = (await accountQuery.find()).length + 1;
    const newAccount = await accountQuery.create({ id, username, funds });
    return res.status(201).json(newAccount);
  } catch (e) {
    res.status(500).json({ msg: "error creating user" });
    console.log(e.Message);
  }
};

exports.updateAccount = async (req, res) => {
  const accountId = parseInt(req.params.accountId);
  const accountData = req.body;
  try {
    const found = await accountQuery.findOne({ id: accountId });
    const updated = found && (await found.updateOne(accountData));
    // combined syntax
    // const foundandUpdatedAccount = await accountQuery.findOneAndUpdate({ id: accountId }, accountData);
    return updated
      ? res.status(204).json(updated)
      : res.status(404).json({ Message: "Account does not exist" });
  } catch (e) {
    res
      .status(500)
      .json({ msg: `error executing the update query for ${accountId}` });
    console.log(e.Message);
  }
};

exports.deleteAccount = async (req, res) => {
  const deletedId = req.params.deletedId;
  try {
    const found = await accountQuery.findOne({ id: deletedId });
    const deleted = found && (await found.deleteOne({ id: deletedId }));
    // combine syntax
    // const foundAndDeletedAccount = await accountQuery.findOneAndDelete({id: deletedId,});
    return deleted
      ? res.status(204).json({ Message: deleted })
      : res.status(404).json({ Message: "Account does not exist" });
  } catch (e) {
    res
      .status(500)
      .json({ msg: `error executing the delete query for ${deletedId}` });
    console.log(e.Message);
  }
};
