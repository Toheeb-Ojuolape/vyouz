<template>
  <AuthContainer :className="'signup-container'">
    <AuthCard>
      <ProgressBar :percentage="percentage" />
      <v-window v-model="step">
        <v-window-item :value="1">
          <SignupForm @nextStep="nextStep" :loading="loading" />
        </v-window-item>
        <v-window-item :value="2">
          <OtpInput
            :title="'Verify Your Email'"
            :description="`Enter the 6-digit Otp sent to 
            <span class='brand-color'>${payload.email}</span>`"
            :length="6"
            :showBackArrow="true"
            @goBack="goBack"
            @verifyOtp="verifyOtp"
          />
        </v-window-item>
        <v-window-item :value="3">
          <BusinessType
            :title="'Select Business Type'"
            :description="'What type of business do you run?'"
            @selectOption="selectOption"
            :selected="businessType"
            @goBack="goBack"
          />
        </v-window-item>
      </v-window>
    </AuthCard>
  </AuthContainer>
</template>



<script lang="ts">
import Vue from "vue";
import AuthContainer from "../../components/Auth/AuthContainer.vue";
import AuthCard from "../..//components/Auth/AuthCard.vue";
import ProgressBar from "../../components/Misc/ProgressBar.vue";
import SignupForm from "../../components/Auth/Signup/SignupForm.vue";
import OtpInput from "../../components/Misc/Forms/OtpInput.vue";
import { SIGNUPPAYLOAD } from "../../constants/constants";
import BusinessType from "../../components/Auth/Signup/BusinessType.vue";
import authService from "../../domain/Auth/authService";

export default Vue.extend({
  name: "SignupView",
  components: {
    AuthContainer,
    AuthCard,
    ProgressBar,
    SignupForm,
    OtpInput,
    BusinessType,
  },
  data() {
    return {
      percentage: 0,
      step: 1,
      payload: SIGNUPPAYLOAD,
      businessType: "",
      loading: false,
      sessionId: "",
    };
  },
  methods: {
    goBack() {
      this.step--;
      this.percentage -= 33.3;
    },
    async nextStep(payload) {
      this.loading = true;
      this.payload = payload;
      try {
        let response = await authService.verifyEmail(payload.email);
        console.log(response);
        this.step++;
        this.percentage += 33.3;
        this.sessionId = response.data.data.sessionId;
        console.log(this.sessionId);
      } catch (error) {
        this.loading = false;
      }
    },
    verifyOtp() {
      this.step++;
      this.percentage += 33.3;
      //api call here
    },
    selectOption(e) {
      this.businessType = e;
    },
  },
});
</script>