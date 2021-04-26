import { Arg, Substitute } from "@fluffy-spoon/substitute";
import { expect } from "chai";
import { isEqual } from "lodash";
import Sinon from "sinon";
import { SellerCreateDto } from "../../../app/dto/SellerCreateDto";
import { Seller } from "../../../app/entity/Seller";
import EntityNotFoundException from "../../../app/exception/EntityNotFoundException";
import SellerRepositoryImpl from "../../../app/repository/SellerRepositoryImpl";
import SellerServiceImpl from "../../../app/service/SellerServiceImpl";
import { ErrorCodes } from "../../../app/util/errorCode";
import SearchResult from "../../../app/util/rest/searchResult";
import URLParams from "../../../app/util/rest/urlparams";

describe("SellerServiceImplTest", () => {
  let sellerService: SellerServiceImpl;
  const sellerRepo = Substitute.for<SellerRepositoryImpl>();
  const createSellerSample: SellerCreateDto = {
    name: "Ajith",
    address: "home address",
  };
  const createSellerSampleResponse: Seller = {
    id: "45a4df1c-6b71-4570-a674-d853863c4165",
    name: "Ajith",
    address: "home address",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const updateSellerId = "45a4df1c-6b71-4570-a674-d853863c4165";
  const updateSellerSample: SellerCreateDto = {
    name: "Ajith",
    address: "office address",
  };
  const updateSellerSampleResponse: Seller = {
    id: updateSellerId,
    name: "Ajith",
    address: "office address",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const invalidSellerId = "InvalidSellerId";
  const allSellerRequest: URLParams = {
    limit: 10,
    offset: 0,
  };
  const allSellerResponse: SearchResult = {
    data: [
      {
        id: "45a4df1c-6b71-4570-a674-d853863c4165",
        name: "Ajith",
        address: "home address",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a647b5a0-a6b9-11eb-bcbc-0242ac130002",
        name: "Alex",
        address: "ofc address",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    length: 2,
    total: 2,
  };
  before("initialize", async () => {
    sellerRepo
      .createSeller(createSellerSample)
      .returns(Promise.resolve(createSellerSampleResponse));
    sellerRepo
      .updateSeller(updateSellerId, updateSellerSample)
      .returns(Promise.resolve(updateSellerSampleResponse));
    sellerRepo
      .updateSeller(invalidSellerId, updateSellerSample)
      .throws(new EntityNotFoundException(ErrorCodes.SELLER_WITH_ID_NOT_FOUND));
    sellerRepo
      .getAllSellers(allSellerRequest)
      .returns(Promise.resolve(allSellerResponse));
    sellerService = new SellerServiceImpl();
    Sinon.stub(sellerService, "getSellerRepository").returns(
      await Promise.resolve(sellerRepo)
    );
  });
  describe("Create a new seller", () => {
    it("Should create a new seller successfully", async () => {
      const sellerCreateResult = await sellerService.createSeller(
        createSellerSample
      );
      expect(sellerCreateResult.name).to.be.equals(createSellerSample.name);
      expect(sellerCreateResult.address).to.be.equals(
        createSellerSample.address
      );
      sellerRepo
        .received()
        .createSeller(Arg.is((arg) => isEqual(arg, createSellerSample)));
    });
  });

  describe("Update seller detail", () => {
    it("Should Update seller detail successfully", async () => {
      const sellerUpdatedResult = await sellerService.updateSeller(
        updateSellerId,
        updateSellerSample
      );
      expect(sellerUpdatedResult.id).to.be.equals(updateSellerId);
      expect(sellerUpdatedResult.name).to.be.equals(updateSellerSample.name);
      expect(sellerUpdatedResult.address).to.be.equals(
        updateSellerSample.address
      );
    });
    it("Should throw 404 Error if passed seller id not exist while updating seller detail", async () => {
      try {
        const appSettingResult = await sellerService.updateSeller(
          invalidSellerId,
          updateSellerSample
        );
      } catch (error) {
        expect(error.errorCode).to.equal("SELLER_WITH_ID_NOT_FOUND");
      }
    });
  });
});
