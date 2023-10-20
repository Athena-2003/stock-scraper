import {ticker} from '../getStockDetails'
import { NextResponse } from "next/server";
const {load} = require('cheerio')
const util = require("util");
const { getDetailsByStockName } = require('../getStockDetails')
const exec = util.promisify(require("child_process").exec);

export async function POST(req, res) {
	try {
		body = req.json();
		//There is ticker value in the req.body
		//call the python script here
		return NextResponse.json({ message: "works", data: body.ticker });
	}
	catch (error) {
		console.log(error)
		return NextResponse.json({ message: "error" })
	}
}
