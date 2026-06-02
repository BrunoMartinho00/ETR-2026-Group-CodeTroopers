import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

class TestIntakeUICompleto:
    
    @pytest.fixture(autouse=True)
    def setup(self):
        options = webdriver.ChromeOptions()
        # options.add_argument('--headless')
        self.driver = webdriver.Chrome(options=options)
        self.driver.get("https://asset-form-guardian.lovable.app/")
        self.driver.maximize_window()
        yield
        self.driver.quit()

    # =====================================================================
    # CENÁRIO 1: HAPPY PATH (Sucesso Total)
    # =====================================================================
    def test_preencher_todos_os_campos(self):
        wait = WebDriverWait(self.driver, 10)
        time.sleep(2) 
        print("\n--- A TESTAR CAMINHO FELIZ (HAPPY PATH) ---")
        
        campo_nome        = wait.until(EC.presence_of_element_located((By.ID, "nome")))
        campo_owner       = self.driver.find_element(By.ID, "owner")
        campo_dashboard   = self.driver.find_element(By.ID, "dashboardUrl")
        campo_rto         = self.driver.find_element(By.ID, "rto")
        campo_rpo         = self.driver.find_element(By.ID, "rpo")
        campo_criticidade = self.driver.find_element(By.ID, "criticidade")
        radio_dr_sim      = self.driver.find_element(By.XPATH, "//label[@for='dr-sim']")
        botao_data        = self.driver.find_element(By.XPATH, "//button[contains(., 'Escolher data')]")
        botao_submeter    = self.driver.find_element(By.XPATH, "//button[contains(., 'Submeter Final')]")

        campo_nome.send_keys("Sistema Central de Pagamentos")
        campo_owner.send_keys("admin@codetroopers.pt")
        campo_dashboard.send_keys("https://grafana.codetroopers.pt")

        campo_criticidade.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).perform()
        
        radio_dr_sim.click()
        campo_rto.send_keys("120")
        campo_rpo.send_keys("30")

        botao_data.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ENTER).perform()
        time.sleep(0.5)
        
        botao_submeter.click()

        try:
            mensagem_sucesso = wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Submissão final registada')]")))
            assert mensagem_sucesso.is_displayed()
            print("✔️ Sucesso! A notificação 'Submissão final registada' apareceu no ecrã.")
        except Exception:
            pytest.fail("❌ Erro: O formulário foi submetido, mas a mensagem de sucesso não apareceu.")


    # =====================================================================
    # CENÁRIO NEGATIVO 1: URL sem HTTPS (http://...)
    # =====================================================================
    def test_erro_url_sem_https(self):
        wait = WebDriverWait(self.driver, 10)
        time.sleep(2)
        print("\n--- A TESTAR ERRO: URL SEM HTTPS ---")
        
        campo_nome        = wait.until(EC.presence_of_element_located((By.ID, "nome")))
        campo_owner       = self.driver.find_element(By.ID, "owner")
        campo_dashboard   = self.driver.find_element(By.ID, "dashboardUrl")
        campo_rto         = self.driver.find_element(By.ID, "rto")
        campo_rpo         = self.driver.find_element(By.ID, "rpo")
        campo_criticidade = self.driver.find_element(By.ID, "criticidade")
        radio_dr_sim      = self.driver.find_element(By.XPATH, "//label[@for='dr-sim']")
        botao_data        = self.driver.find_element(By.XPATH, "//button[contains(., 'Escolher data')]")
        botao_submeter    = self.driver.find_element(By.XPATH, "//button[contains(., 'Submeter Final')]")

        campo_nome.send_keys("Sistema de Teste 1")
        campo_owner.send_keys("admin@codetroopers.pt")
        campo_dashboard.send_keys("http://grafana.codetroopers.pt") 
        
        campo_criticidade.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).perform()
        
        radio_dr_sim.click()
        campo_rto.send_keys("60")
        campo_rpo.send_keys("15")

        botao_data.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ENTER).perform()
        time.sleep(0.5)
        
        botao_submeter.click()

        try:
            alerta_erro = wait.until(EC.visibility_of_element_located((By.XPATH, "//h5[contains(text(), 'Não foi possível submeter')]")))
            # CORREÇÃO: Utilizar o '.' para ler todos os nós de texto dentro do 'li'
            detalhe_erro = wait.until(EC.visibility_of_element_located((By.XPATH, "//ul[contains(@class, 'list-disc')]//li[contains(., 'URL') or contains(., 'HTTPS') or contains(., 'Dashboard')]")))
            assert alerta_erro.is_displayed()
            assert detalhe_erro.is_displayed()
            print("✔️ Passou: Bloqueou corretamente URL sem 'https://'.")
        except Exception:
            pytest.fail("❌ Falhou: Aceitou um URL inseguro (http://) sem dar erro.")


    # =====================================================================
    # CENÁRIO NEGATIVO 2: URL sem Domínio (.com, .net, etc)
    # =====================================================================
    def test_erro_url_sem_dominio(self):
        wait = WebDriverWait(self.driver, 10)
        time.sleep(2)
        print("\n--- A TESTAR ERRO: URL SEM DOMÍNIO (.com/.pt) ---")
        
        campo_nome        = wait.until(EC.presence_of_element_located((By.ID, "nome")))
        campo_owner       = self.driver.find_element(By.ID, "owner")
        campo_dashboard   = self.driver.find_element(By.ID, "dashboardUrl")
        campo_rto         = self.driver.find_element(By.ID, "rto")
        campo_rpo         = self.driver.find_element(By.ID, "rpo")
        campo_criticidade = self.driver.find_element(By.ID, "criticidade")
        radio_dr_sim      = self.driver.find_element(By.XPATH, "//label[@for='dr-sim']")
        botao_data        = self.driver.find_element(By.XPATH, "//button[contains(., 'Escolher data')]")
        botao_submeter    = self.driver.find_element(By.XPATH, "//button[contains(., 'Submeter Final')]")

        campo_nome.send_keys("Sistema de Teste 2")
        campo_owner.send_keys("admin@codetroopers.pt")
        campo_dashboard.send_keys("https://monitorizacao-interna") 
        
        campo_criticidade.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).perform()
        
        radio_dr_sim.click()
        campo_rto.send_keys("60")
        campo_rpo.send_keys("15")

        botao_data.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ENTER).perform()
        time.sleep(0.5)
        
        botao_submeter.click()

        try:
            alerta_erro = wait.until(EC.visibility_of_element_located((By.XPATH, "//h5[contains(text(), 'Não foi possível submeter')]")))
            # CORREÇÃO: Utilizar o '.' para ler todos os nós de texto dentro do 'li'
            detalhe_erro = wait.until(EC.visibility_of_element_located((By.XPATH, "//ul[contains(@class, 'list-disc')]//li[contains(., 'URL') or contains(., 'inválido') or contains(., 'invalido')]")))
            assert alerta_erro.is_displayed()
            assert detalhe_erro.is_displayed()
            print("✔️ Passou: Bloqueou corretamente URL mal formatado.")
        except Exception:
            pytest.fail("❌ Falhou: Aceitou um URL incompleto.")


    # =====================================================================
    # CENÁRIO NEGATIVO 3: Email Pessoal/Não Institucional
    # =====================================================================
    def test_erro_email_nao_institucional(self):
        wait = WebDriverWait(self.driver, 10)
        time.sleep(2)
        print("\n--- A TESTAR ERRO: EMAIL NÃO CORPORATIVO (@gmail.com) ---")
        
        campo_nome        = wait.until(EC.presence_of_element_located((By.ID, "nome")))
        campo_owner       = self.driver.find_element(By.ID, "owner")
        campo_dashboard   = self.driver.find_element(By.ID, "dashboardUrl")
        campo_rto         = self.driver.find_element(By.ID, "rto")
        campo_rpo         = self.driver.find_element(By.ID, "rpo")
        campo_criticidade = self.driver.find_element(By.ID, "criticidade")
        radio_dr_sim      = self.driver.find_element(By.XPATH, "//label[@for='dr-sim']")
        botao_data        = self.driver.find_element(By.XPATH, "//button[contains(., 'Escolher data')]")
        botao_submeter    = self.driver.find_element(By.XPATH, "//button[contains(., 'Submeter Final')]")

        campo_nome.send_keys("Sistema de Teste 3")
        campo_owner.send_keys("bruno.martinho@gmail.com") 
        campo_dashboard.send_keys("https://grafana.codetroopers.pt")
        
        campo_criticidade.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).perform()
        
        radio_dr_sim.click()
        campo_rto.send_keys("60")
        campo_rpo.send_keys("15")

        botao_data.click()
        time.sleep(0.5)
        ActionChains(self.driver).send_keys(Keys.ENTER).perform()
        time.sleep(0.5)
        
        botao_submeter.click()

        try:
            alerta_erro = wait.until(EC.visibility_of_element_located((By.XPATH, "//h5[contains(text(), 'Não foi possível submeter')]")))
            # CORREÇÃO: Utilizar o '.' para ler todos os nós de texto dentro do 'li'
            detalhe_erro = wait.until(EC.visibility_of_element_located((By.XPATH, "//ul[contains(@class, 'list-disc')]//li[contains(., 'Owner') or contains(., 'Email') or contains(., 'email') or contains(., 'inválido')]")))
            assert alerta_erro.is_displayed()
            assert detalhe_erro.is_displayed()
            print("✔️ Passou: Rejeitou ativamente um endereço de e-mail comum.")
        except Exception:
            pytest.fail("❌ Falhou: Aceitou um email não-institucional (@gmail.com).")