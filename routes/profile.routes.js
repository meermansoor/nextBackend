import router from "express";
import {
  getProfile,
  editProfile,
  uploadImage,
  getPrivacyPolicy,
  getTermsOfService,
  shareApp,
} from "../controllers/profile.controller";
const profileRouter = router();

profileRouter.get("/", getProfile);
profileRouter.post("/edit-profile", editProfile);
profileRouter.post("/image", uploadImage);
profileRouter.get("/privacy-policy", getPrivacyPolicy);
profileRouter.get("/terms-of-service", getTermsOfService);
profileRouter.get("/share-app", shareApp);

export default profileRouter;
